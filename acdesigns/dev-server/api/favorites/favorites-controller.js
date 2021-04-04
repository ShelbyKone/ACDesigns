import User from '../../models/user-model'
import Design from '../../models/design-model'

export function getFavorites(req, res) {
    User.find({_id: req.params.userId}, 'favorites', (error, designs) => {
        if (error) {
            return res.status(500).send('Error getting users favorites') //status: internal server error
        }
        return res.status(200).json({designs: designs})
    }).populate('favorites')
}

export function addFavorite(req, res) {
    User.updateOne({ _id: req.params.userId }, { $addToSet: { favorites: req.params.designId } }, (error) => {
        if (error) {
            return res.status(500).send('Error adding design to favorites') //status: internal server error
        }
        Design.updateOne({ _id: req.params.designId }, { $inc: { likes: 1 } }, (error) => {
            if (error) {
                return res.status(500).send('Error adding design to favorites') //status: internal server error
            }
            return res.status(204).send() //status: success, no content
        })
    })
}

export function deleteFavorite(req, res) {
    User.updateOne({ _id: req.params.userId }, { $pull: { favorites: req.params.designId } }, (error) => {
        if (error) {
            return res.status(500).send('Error removing design from favorites') //status: internal server error
        }
        Design.updateOne({ _id: req.params.designId }, { $inc: { likes: -1 } }, (error) => {
            if (error) {
                return res.status(500).send('Error adding design to favorites') //status: internal server error
            }
            return res.status(204).send() //status: success, no content
        })
    })
}