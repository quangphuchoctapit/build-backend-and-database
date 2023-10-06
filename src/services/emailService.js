require('dotenv').config()
import nodemailer from 'nodemailer'

let sendSimpleEmail = async (dataReceiver) => {
    let transproter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        },
    })
    let info = await transproter.sendMail({
        from: '"TommyLeBookingcare " <thangteo1310@gmail.com> ',
        to: dataReceiver.email,
        subject: 'TommyLeBookingcare',
        text: 'TommyLeBookingcare',
        html: getBodyHTMLEmail(dataReceiver)
    })
}

let getBodyHTMLEmail = (dataReceiver) => {
    let result = ``
    if (dataReceiver.language === 'en') {
        result = `
        <h2>Dear ${dataReceiver.fullName}</h2>
        <p>We are happy that you chose tommyle Bookingcare's booking as a place to examine your health.</p>
        <p>Details of your booking reservation: </p>
        <h4>Time: ${dataReceiver.timeString}</h4>
        <h4>Doctor: ${dataReceiver.doctorName}</h4>
        <p>If the above information is true, please click on the below link to proceed and finish your booking reservation.</p>
        <a href='${dataReceiver.redirectLink}'>Click here</a><br><hr/>
        `
        return result
    }
    if (dataReceiver.language === 'vi') {
        result = `
        <h2>Xin chào ${dataReceiver.fullName}</h2>
        <p>Bạn nhận được email vì đã tin tưởng đặt lịch khám bệnh tại tommyle Bookingcare.</p>
        <p>Thông tin đặt lịch khám bệnh: </p>
        <h4>Thời gian: ${dataReceiver.timeString}</h4>
        <h4>Bác sĩ: ${dataReceiver.doctorName}</h4>
        <p>Nếu thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám.</p>
        <a href='${dataReceiver.redirectLink}'>Click here</a><br><hr/>
        `
        return result
    }
}

module.exports = {
    sendSimpleEmail
}