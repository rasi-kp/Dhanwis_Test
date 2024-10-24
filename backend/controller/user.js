require('dotenv').config();
const User = require('../model/userShema');
const Otp = require('../model/otpSchema');
const twilio = require('twilio');
const randomstring = require('randomstring');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

module.exports = {
  otp: async (req, res) => {
    const { mobileno } = req.body;
    try {
      console.log(mobileno);
      otpgen = randomstring.generate({
        length: 4,
        charset: 'numeric'
      });
      console.log(otpgen);
      const user = await Otp.findOneAndUpdate(
        { mobileno },
        { otp:otpgen },
        { new: true, upsert: true }
      );

      const messageText = `Otp :${otpgen}`;
      await client.messages.create({
        from: '+16613678705',
        to: `+91${mobileno}`,
        body: messageText,
      });

      return res.status(200).json({ success: 'OTP sent successfully', "mobileno":mobileno });
    } catch (error) {
      console.error(error); // Log the actual error
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  verifyOtp: async (req, res) => {
    const { mobileno, otp } = req.body;
    try {
      const user = await Otp.findOne({ mobileno });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
      if (user.otp === otp) {
        User.create( { mobileno:mobileno } )
        return res.status(200).json({ success: 'OTP verified successfully' });
      } else {
        return res.status(400).json({ error: 'Invalid OTP' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};
