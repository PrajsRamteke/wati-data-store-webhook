const database = require('../database/database.js');

const webhookHandler = async (req, res) => {
  try {
    const webhookData = req.body;

    const insertQuery = `
      INSERT INTO messages (
        created, whatsappMessageId, conversationId, ticketId, text, type,
        data, timestamp, owner, eventType, statusString, avatarUrl,
        assignedId, operatorName, operatorEmail, waId, messageContact,
        senderName, listReply, replyContextId
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
      ) RETURNING id`;

    const values = [
      webhookData.created,
      webhookData.whatsappMessageId,
      webhookData.conversationId,
      webhookData.ticketId,
      webhookData.text,
      webhookData.type,
      webhookData.data,
      webhookData.timestamp,
      webhookData.owner,
      webhookData.eventType,
      webhookData.statusString,
      webhookData.avatarUrl,
      webhookData.assignedId,
      webhookData.operatorName,
      webhookData.operatorEmail,
      webhookData.waId,
      webhookData.messageContact,
      webhookData.senderName,
      webhookData.listReply,
      webhookData.replyContextId
    ];

    const result = await database.query(insertQuery, values);
    const insertedId = result.rows[0].id;

    res.status(200).json({ success: true, insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = webhookHandler;


// CREATE TABLE messages (
//   id SERIAL PRIMARY KEY,
//   created TIMESTAMP,
//   whatsappMessageId VARCHAR(255),
//   conversationId VARCHAR(255),
//   ticketId VARCHAR(255),
//   text TEXT,
//   type VARCHAR(255),
//   data JSONB,
//   timestamp TIMESTAMP,
//   owner VARCHAR(255),
//   eventType VARCHAR(255),
//   statusString VARCHAR(255),
//   avatarUrl VARCHAR(255),
//   assignedId VARCHAR(255),
//   operatorName VARCHAR(255),
//   operatorEmail VARCHAR(255),
//   waId VARCHAR(255),
//   messageContact VARCHAR(255),
//   senderName VARCHAR(255),
//   listReply VARCHAR(255),
//   replyContextId VARCHAR(255)
// )
