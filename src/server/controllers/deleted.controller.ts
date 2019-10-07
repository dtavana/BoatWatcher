const getDeleted = async (req, res) => {
    const db = req.app.locals.db;
    const { botid } = req.body;
    if (!botid) {
        res.status(401).send({
            success: false,
            data: 'Not botid was provided',
        });
    } else {
        const logs = await db.any('SELECT * FROM deletedlogs WHERE botid = $1;', botid);
        res.status(200).send({
            success: true,
            data: logs,
        });
    }
};

export { getDeleted };
