import Design from '../../models/design-model'

export function searchDesigns(req, res) {
    //get the query parameters
    const page = req.query.page ? parseInt(req.query.page) : 0
    const term = req.query.term ? req.query.term : ""
    //set the skip/limit for pagination
    const limit = 12
    const skip = limit * page

    Design.aggregate([
        {
            $search: {
                "compound": {
                    "must": [{
                        "text": {
                            "query": term,
                            "path": ["title", "tags"]
                        },
                    }],
                    // "filter": [{
                    //     "text": {
                    //         "query": "hat",
                    //         "path": "type"
                    //     }
                    // }]
                }
            }
        },
        { $skip: skip },
        { $limit: limit }
    ], (error, designs) => {
        if (error) {
            return res.status(500).send('Error retrieving designs from database.') //status: internal server error
        }
        return res.status(200).json({ designs: designs })
    })
}