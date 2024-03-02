
const { Boom } = require('@hapi/boom')

const NodeCache = require('node-cache')



const baileys = require('@whiskeysockets/baileys')

const fs = require('fs')

const prompt = require('prompt-sync')();

const Pino = require("pino");

const axios = require("axios");







const { useMultiFileAuthState, DisconnectReason, makeInMemoryStore, jidNormalizedUser, makeCacheableSignalKeyStore, PHONENUMBER_MCC, delay } = baileys







 /* 

  Foreground (text) colors:

  30: Black  31: Red  32: Green  33: Yellow  34: Blue 35: Magenta 36: Cyan  37: White

  Background colors:

  40: Black  41: Red  42: Green  43: Yellow  44: Blue 45: Magenta 46: Cyan  47: White

  Text attributes:

  1: Bold   4: Underline

  */













var phoneNumber = "23184474176";



const styledText = (text, fgColorCode, bgColorCode, isBold) => {

  const attributes = [fgColorCode, bgColorCode, isBold];

  //if (isBold) { attributes.push(1);  }

  const attributeString = attributes.join(';');

  return `\x1b[${attributeString}m${text}\x1b[0m`;

};



const getInput = (text = "Enter Your Phone number: (ex:-+94760405102)") => {

  let input = prompt(styledText(text, 32, 40, 1));

  let res = input ? input.replace(/[^0-9]/g, '') : "";

  if (res && !isNaN(res) && res.length > 7) { return res; }

  else {

    console.log(styledText("YOU ENYERED AN INVALID PHONE NUMBER ", 31, 40, 1))

    process.exit(0)

   // getInput("\n\nPlease Enter a valid phone number: ")

  }

}







// Prompt the user for input















const remove = async (dir) => {

  try { if (fs.existsSync(dir)) { await fs.rmdirSync(dir, { recursive: true }); } } catch { }

};











































var phoneNumber = getInput();





let dirName = `sessions/${phoneNumber}'s_info`



















































const store = makeInMemoryStore({ logger: Pino({ level: "silent" }).child({ level: "silent" }) })





















// start connect to client

async function start() {

  process.on("unhandledRejection", (err) => console.error(err))







  const { state, saveCreds } = await useMultiFileAuthState(`./${dirName}`)

  const msgRetryCounterCache = new NodeCache()



  const SUHAIL = baileys.default({

    logger: Pino({ level: "silent" }).child({ level: "silent" }),

    printQRInTerminal: false,



    auth: {

      creds: state.creds,

      keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "silent" }).child({ level: "silent" })),

    },

    browser: ['GOSTMD (Linux)', '', ''],

    markOnlineOnConnect: false,

    generateHighQualityLinkPreview: true,

    getMessage: async (key) => {

      let jid = jidNormalizedUser(key.remoteJid)

      let msg = await store.loadMessage(jid, key.id)



      return msg?.message || ""

    },

    msgRetryCounterCache,

    defaultQueryTimeoutMs: undefined,

  })



  store.bind(SUHAIL.ev)



  if (!SUHAIL.authState.creds.registered) {





    //let phoneNumber = "17863688449";





    setTimeout(async () => {

      let code = await SUHAIL.requestPairingCode(phoneNumber)

      code = code?.match(/.{1,4}/g)?.join("-") || code

      console.log(styledText(`\n\nYour Pairing Code:`, 37, 33, 1) + "\t" + styledText(code, 31, 46, 1) + "\n")

      console.log();

    }, 3000)

  }





  // for auto restart when error client

  SUHAIL.ev.on("connection.update", async (update) => {

    const { lastDisconnect, connection, qr } = update

    if (connection) {

      //console.info(`Connection Status : ${connection}`)

    }



    if (connection === "close") {

      let reason = new Boom(lastDisconnect?.error)?.output.statusCode

      if (reason === DisconnectReason.badSession) {

        console.log(`Bad Session File, Please Delete Session and Scan Again`)

        process.exit(0)

      } else if (reason === DisconnectReason.connectionClosed) {

        console.log("Connection closed, reconnecting....")

        await start()

      } else if (reason === DisconnectReason.connectionLost) {

        console.log("Connection Lost from Server, Please run again!")

        process.exit(1)

      } else if (reason === DisconnectReason.connectionReplaced) {

        console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First")

        process.exit(1)

      } else if (reason === DisconnectReason.loggedOut) {

        console.log(`Device Logged Out, Please Scan Again And Run.`)

        process.exit(1)

      } else if (reason === DisconnectReason.restartRequired) {

        //console.log("Restarting...")

        await start()

      } else if (reason === DisconnectReason.timedOut) {

        console.log("Connection TimedOut, Reconnecting...")

        await start()

      } else if (reason === DisconnectReason.multideviceMismatch) {

        console.log("Multi device mismatch, please scan again")

        process.exit(0)

      } else {

        console.log(reason)

        process.exit(0)

      }

    }



    if (connection === "open") {

      console.log("Connected")

      console.log(styledText("DEVICE LOGGED IN 100% ", 31, 40, 1))

      let user = SUHAIL.user.id;



      await delay(3000)

    let unique = await fs.readFileSync(__dirname + '/' + dirName + '/creds.json');

      //console.log("sessions2 : ", c2)

      let Scan_ID =  Buffer.from(unique).toString('base64');













    





















      console.log(`

  ====================  SESSION ID  ===========================                   

  SESSION-ID ==> ${Scan_ID}\n\n`)

      console.log(styledText(`Don't provide your SESSION_ID to anyone otherwise that user can access your account.

Thanks.`, 32, 40, 1), "\n-------------------  SESSION CLOSED   -----------------------")











      let MESSAGES = `

╔════◇

║『𝗧𝗵𝗮𝗻𝗸𝘀 𝗙𝗼𝗿 𝗖𝗵𝗼𝗼𝘀𝗶𝗻𝗴 CYBER GOST MD』

║ _You completed first step_

╚════════════════════╝

╔═════◇

║  『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』

║ 1. *_Repo:_* https://github.com/Nadunsl

║ 2. *_Youtube:_* https://www.youtube.com

║ 3. *_Owner:_* https://wa.me/+94 76 040 5102

║ 4. *_Support Group:_* https://chat.whatsapp.com

║ 5. *_Updates Channel:_*  https://whatsapp.com/channel/

║ Note : _Don't provide your *SESSION_ID* to

║ anyone otherwise that can access chats_

╚════════════════════╝



  `;

       await SUHAIL.sendMessage(user, { text: Scan_ID });

       await SUHAIL.sendMessage(user, { text: MESSAGES });

      try { remove(dirName); } catch { } // await require('child_process').exec('rm -rf auth_info_baileys')  

      process.exit(1)   // STOPPING PROCESS AFTER GETTING SESSION ID















    }

  })





  SUHAIL.ev.on("creds.update", saveCreds)







}





start()