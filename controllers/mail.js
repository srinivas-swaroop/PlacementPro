const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    family: 4,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

async function sendMail(email, otp, name){
    try {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Password Reset OTP - PlacementPro",
        html: `
        <div style="
            margin:0;
            padding:0;
            background:#000;
            font-family:Inter, Arial, sans-serif;
            color:#fff;
        ">
            <div style="
                max-width:600px;
                margin:auto;
                padding:40px 20px;
            ">

                <!-- HEADER -->
                 <h1 style="
        margin:0;
        font-weight:600;
        font-size:26px;
        letter-spacing:0.5px;
    ">
        PlacementPro
    </h1>

    <p style="
        margin:8px 0 0 0;
        color:#bbb;
        font-size:15px;
    ">
        Hi <span style="color:#fff; font-weight:500;">${name}</span>,
    </p>

    <p style="
        margin:6px 0 0 0;
        color:#888;
        font-size:14px;
        letter-spacing:0.3px;
    ">
        Crack placements smarter.
    </p>




                <!-- CARD -->
                <div style="
                    background:#0a0a0a;
                    padding:30px;
                    border-radius:12px;
                    margin-top:30px;
                    border:1px solid #222;
                ">
                    <h2 style="margin-bottom:10px;">Password Reset OTP</h2>
                    <p style="color:#aaa;">
                        Use the OTP below to reset your password.
                    </p>

                    <!-- OTP BOX -->
                    <div style="
                        margin:30px 0;
                        padding:20px;
                        text-align:center;
                        background:#111;
                        border-radius:10px;
                        font-size:28px;
                        letter-spacing:6px;
                        font-weight:600;
                    ">
                        ${otp}
                    </div>

                    <p style="color:#777; font-size:14px;">
                        This OTP is valid for 10 minutes. Do not share it with anyone.
                    </p>
                </div>

                <!-- FEATURES -->
                <div style="margin-top:40px;">
                    <h3 style="margin-bottom:10px;">What is PlacementPro?</h3>
                    <p style="color:#aaa; line-height:1.6;">
                        PlacementPro helps you manage your entire placement journey in one place.
                        Analyze your LinkedIn profile, improve your resume for specific roles,
                        and track your progress with clarity.
                    </p>

                    <ul style="color:#aaa; margin-top:15px; padding-left:20px;">
                        <li>Track applications</li>
                        <li>Monitor interview progress</li>
                        <li>Improve resume for job roles</li>
                        <li>LinkedIn profile insights</li>
                    </ul>
                </div>

                <!-- CTA -->
                <div style="margin-top:30px; text-align:center;">
                    <a href="https://placementpro-y3bv.onrender.com/auth/login"
                        style="
                        display:inline-block;
                        padding:12px 24px;
                        background:#fff;
                        color:#000;
                        border-radius:30px;
                        text-decoration:none;
                        font-weight:600;
                    ">
                        Login to PlacementPro
                    </a>
                </div>

                <!-- FOOTER -->
                <div style="
                    margin-top:50px;
                    font-size:13px;
                    color:#666;
                    text-align:center;
                ">
                    © 2026 PlacementPro. Built for smarter placements. <br/>
                    Crafted by Srinivas Swaroop
                </div>

            </div>
        </div>
        `
    });

    console.log("Mail sent ✅");

} catch (err) {
    console.log("Mail error ❌", err);
}
}

module.exports = { sendMail };