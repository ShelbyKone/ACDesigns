import userRoutes from './api/user/user-routes'
import designRoutes from './api/design/design-routes'

export function registerRoutes(app) {
    app.use('/api', userRoutes)
    app.use('/api', designRoutes)
}