const getDeleted = async (req, res) => {
    const db = req.app.locals.db;
    const client = req.app.locals.client;
    const { botId } = req.body;
    if (!botId) {
        res.status(401).send({
            success: false,
            data: 'Not botId was provided',
        });
    } else {
        const logs = await db.any('SELECT * FROM deletedlogs WHERE botid = $1;', botId);
        res.status(200).send({
            success: true,
            data: logs,
        });
    }
};

export { getDeleted };
