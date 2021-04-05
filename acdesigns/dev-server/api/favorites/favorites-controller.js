import User from '../../models/user-model'
import Design from '../../models/design-model'

export function getFavorites(req, res) {
    User.findOne({ _id: req.params.userId }, 'favorites', (error, user) => {
        if (error) {
            return res.status(500).send('Error getting users favorites') //status: internal server error
        }
        return res.status(200).json({ user: user })
    }).populate('favorites')
}

export function addFavorite(req, res) {
    User.updateOne({ _id: req.params.userId }, { $addToSet: { favorites: req.params.designId } }, (error) => {
        if (error) {
            return res.status(500).send('Error adding design to favorites') //status: internal server error
        }
        Design.updateOne({ _id: req.params.designId }, { $addToSet: { likes: req.params.userId } }, (error) => {
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
        Design.updateOne({ _id: req.params.designId }, { $pull: { likes: req.params.userId } }, (error) => {
            if (error) {
                return res.status(500).send('Error adding design to favorites') //status: internal server error
            }
            return res.status(204).send() //status: success, no content
        })
    })
}