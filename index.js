const dgram = require('dgram')
const readline = require('readline')
const { execSync, execFileSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const os = require('os')
 
const CHANNELS = 1
const RATE = 44100
const BITS = 8
const FRAMES = 65000 
const FRAME_SIZE = (BITS / 8) * CHANNELS
const DURACION_SEG = FRAMES / RATE

const TEMP_DIR = os.tmpdir()
const ARCHIVO_GRABAR = path.join(TEMP_DIR, 'walkie_grab.raw')
const ARCHIVO_REPRODUCIR = path.join(TEMP_DIR, 'walkie_play.raw')

function StartServer(puerto) {
    const socket = dgram.createSocket('udp4')

    socket.bind(puerto, () => {
        console.log('=========================================')
        console.log('  WALKIE-TALKIE SERVIDOR')
        console.log(`  Escuchando en puerto ${puerto}`)
        console.log('  Esperando audio...')
        console.log('  (Ctrl+C para cerrar)')
        console.log('=========================================')
    })

    socket.on('message', (datos, info) => {
        const framesRecibidos = datos.length / FRAME_SIZE
        console.log(`\nRecibi ${framesRecibidos} frames de ${info.address}:${info.port}`)

        fs.writeFileSync(ARCHIVO_REPRODUCIR, datos)

        console.log('Reproduciendo...')
        try {
            execFileSync('sox', [
                '-t', 'raw',
                '-r', String(RATE),
                '-b', String(BITS),
                '-c', String(CHANNELS),
                '-e', 'unsigned-integer',
                ARCHIVO_REPRODUCIR,
                '-t', 'waveaudio',
                'default'
            ])
            console.log('Reproducción terminada.')
        } catch (err) {
            console.log('Error al reproducir:', err.message)
        }

        console.log('Esperando mas audio...')
    })

    socket.on('error', (err) => {
        console.log('Error del socket:', err.message)
        socket.close()
    })
}

function StartClient(puerto) {
    const socket = dgram.createSocket('udp4')

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    console.log('=========================================')
    console.log('  WALKIE-TALKIE CLIENTE')
    console.log(`  Puerto de envio: ${puerto}`)
    console.log('  Escribe "salir" para cerrar')
    console.log('=========================================')

    function pedirIPyGrabar() {
        rl.question('\nIP del servidor (o "salir"): ', (ip) => {
            if (ip.toLowerCase() === 'salir') {
                rl.close()
                socket.close()
                console.log('Cliente cerrado.')
                return
            }

            console.log(`Grabando ${DURACION_SEG.toFixed(1)} segundos... hablá ahora!`)

            try {
                execFileSync('sox', [
                    '-t', 'waveaudio',
                    'default',
                    '-t', 'raw',
                    '-r', String(RATE),
                    '-b', String(BITS),
                    '-c', String(CHANNELS),
                    '-e', 'unsigned-integer',
                    ARCHIVO_GRABAR,
                    'trim', '0', String(DURACION_SEG)
                ])
            } catch (err) {
                console.log('Error al grabar:', err.message)
                pedirIPyGrabar()
                return
            }

            console.log('Grabacion terminada.')

            let audioData = fs.readFileSync(ARCHIVO_GRABAR)

            const maxBytes = FRAMES * FRAME_SIZE
            if (audioData.length > maxBytes) {
                audioData = audioData.slice(0, maxBytes)
            }

            const bytesEnviar = audioData.length
            const framesEnviar = bytesEnviar / FRAME_SIZE

            socket.send(audioData, puerto, ip, (err) => {
                if (err) {
                    console.log('Error al enviar:', err.message)
                } else {
                    console.log(`Enviados ${bytesEnviar} bytes (${framesEnviar} frames) a ${ip}:${puerto}`)
                }
                pedirIPyGrabar()
            })
        })
    }

    pedirIPyGrabar()
}

const modo = process.argv[2]
const puerto = parseInt(process.argv[3])

if (!modo || !puerto) {
    console.log('Uso: node index.js.js <cliente|servidor> <puerto>')
    console.log('')
    console.log('Ejemplos:')
    console.log('  node index.js servidor 5000')
    console.log('  node index.js cliente 5000')
    process.exit(1)
}

try {
    execSync('sox --version', { stdio: 'ignore' })
} catch (err) {
    console.log('ERROR: sox no esta instalado o no está en el PATH.')
    console.log('Descargalo de: https://sourceforge.net/projects/sox/files/sox/')
    process.exit(1)
}

if (modo === 'servidor') {
    StartServer(puerto)
} else if (modo === 'cliente') {
    StartClient(puerto)
} else {
    console.log('Modo no válido. Usá "cliente" o "servidor"')
}
