import db from '../config/db.js';

export const getContentBySection = async (req, res) => {
    try {
        const { section } = req.params;
        const [rows] = await db.query(
            'SELECT * FROM app_content WHERE section_name = ? ORDER BY display_order ASC',
            [section]
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getAllContent = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM app_content ORDER BY section_name, display_order ASC');
        // Group by section
        const content = rows.reduce((acc, item) => {
            if (!acc[item.section_name]) {
                acc[item.section_name] = [];
            }
            acc[item.section_name].push(item);
            return acc;
        }, {});

        res.status(200).json(content);
    } catch (error) {
        console.error('Error fetching all content:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
