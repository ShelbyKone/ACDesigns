import Design from '../../models/design-model'

export function searchDesigns(req, res) {
    Design.aggregate([
        {
            $search: {
                "compound": {
                    "must": [{
                        "text": {
                            "query": ["cherry", "japan"],
                            "path": ["title", "tags"]
                        },
                    }],
                    "filter": [{
                        "text": {
                            "query": "hat",
                            "path": "type"
                        }
                    }]
                }
            }
        },
        {
            $skip: 0
        },
        {
            $limit: 12
        }
    ], (error, designs) => {
        if (error) {
            return res.status(500).send('Error retrieving designs from database.') //status: internal server error
        }
        return res.status(200).json({ designs: designs })
    })
}