import userRoutes from './api/user/user-routes'
import designRoutes from './api/design/design-routes'
import favoritesRoutes from './api/favorites/favorites-routes'

export function registerRoutes(app) {
    app.use('/api', userRoutes)
    app.use('/api', designRoutes)
    app.use('/api', favoritesRoutes)
}