import db from "../config/db.js";
import nodemailer from 'nodemailer'
export const createTenentRequest = async (req, res) => {
    try {
        const { pg_id, full_name, email, phone } = req.body;
        const userId = req.userId;

        if (!full_name || !email || !phone || !pg_id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Insert the tenant request
        const [results] = await db.execute(
            'INSERT INTO tenent_call_requests ( user_id , pg_id , full_name , email , phone ) VALUES( ? , ? , ? , ? , ? )',
            [userId, pg_id, full_name, email, phone]
        );

        // Get owner phone from pg_data table, not users table
        const [ownerData] = await db.execute(
            `SELECT owner_phone FROM pg_data WHERE id = ?`,
            [pg_id]
        );

        res.status(201).json({
            message: 'Call Request raised successfully',
            requestID: results.insertId,
            owner_phone: ownerData[0]?.owner_phone || null
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error raising call request' });
    }
}

export const getTenentRequest = async (req, res) => {
    try {
        const [requests] = await db.execute(
            `SELECT r.*, p.property_name
            FROM tenent_call_requests r
            JOIN pg_data p ON r.pg_id = p.id
            ORDER BY r.created_at DESC`
        )
        res.status(200).json(requests);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Failed to fetch requests" });
    }
}

export const updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        await db.execute('UPDATE tenent_call_requests SET status = ? WHERE id = ?', [status, id]);
        res.status(200).json({ message: 'Request status updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating request' });
    }
};

export const sendOwnerDetails = async (req, res) => {
    try {
        const { request_id } = req.params;

        // Get request details
        const [request_details] = await db.execute(
            `SELECT 
                r.full_name, 
                r.email, 
                r.phone,
                p.property_name,
                p.owner_phone
             FROM tenent_call_requests r
             JOIN pg_data p ON r.pg_id = p.id
             WHERE r.id = ?`,
            [request_id]
        );

        if (request_details.length === 0) {
            return res.status(404).json({ message: "Request not found" });
        }

        const { full_name, email, property_name, owner_phone } = request_details[0];

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Zibmate" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Your journey home to ${property_name} starts here!`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
                .header { background: #f97316; padding: 40px 20px; text-align: center; }
                .header h1 { color: white; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
                .content { padding: 40px; }
                .heart-icon { font-size: 32px; margin-bottom: 20px; display: block; }
                .greeting { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 10px; }
                .message { color: #475569; margin-bottom: 25px; }
                .contact-card { background: #fff7ed; border: 1px dashed #fdba74; padding: 30px; border-radius: 20px; text-align: center; margin: 30px 0; }
                .owner-label { text-transform: uppercase; font-size: 11px; font-weight: 800; color: #c2410c; letter-spacing: 1px; margin-bottom: 8px; }
                .phone-number { font-size: 28px; font-weight: 900; color: #1e293b; margin: 10px 0; display: block; text-decoration: none; }
                .call-btn { display: inline-block; padding: 14px 40px; background: #f97316; color: white !important; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; margin-top: 15px; transition: background 0.2s; }
                .footer { background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; }
                .emotional-note { font-style: italic; color: #64748b; font-size: 13px; margin-bottom: 15px; }
                .signature { font-weight: 700; color: #f97316; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Your Future Home Awaits</h1>
                </div>
                <div class="content">
                    <span class="heart-icon">🏠</span>
                    <p class="greeting">Hi ${full_name},</p>
                    <p class="message">
                        We know that finding a place to live isn't just about four walls and a bed—it's about finding a sanctuary where you can grow, dream, and feel safe. We are truly honored that you chose <strong>Zibmate</strong> to help you on this journey. 
                        <br><br>
                        Take the first step toward your new beginning at <strong>${property_name}</strong>. Here are the contact details you requested:
                    </p>
                    
                    <div class="contact-card">
                        <div class="owner-label">Direct Line to Owner</div>
                        <a href="tel:${owner_phone}" class="phone-number">${owner_phone}</a>
                        <p style="font-size: 13px; color: #9a3412; margin: 5px 0 15px 0;">A friendly conversation is just a call away.</p>
                        <a href="tel:${owner_phone}" class="call-btn">Connect Now</a>
                    </div>
                    
                    <p class="message">
                        If this doesn't feel like "the one," don't worry. Your perfect match is out there, and we won't stop until you're settled in comfortably. We're in this together.
                    </p>
                </div>
                <div class="footer">
                    <p class="emotional-note">"Home is where your story begins. Thank you for letting us be a small part of yours."</p>
                    <p style="margin: 0; font-size: 14px; color: #475569;">Warmly,</p>
                    <p class="signature" style="margin-top: 5px;">Team Zibmate</p>
                </div>
            </div>
        </body>
        </html>
    `,
            text: `Hi ${full_name},\n\nWe know finding a home is a big step, and we're honored to help. Your requested contact for ${property_name} is ${owner_phone}.\n\nWe're here for you until you find the perfect place.\n\nWarmly,\nTeam Zibmate`
        });

        await db.execute(
            `UPDATE tenent_call_requests SET status = ?, email_sent = true, email_sent_at = NOW() WHERE id = ?`,
            ['inactive', request_id]
        );

        res.status(200).json({
            message: 'Contact details sent successfully to your email',
            email: email
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            message: 'Error sending email',
            error: error.message
        });
    }
}