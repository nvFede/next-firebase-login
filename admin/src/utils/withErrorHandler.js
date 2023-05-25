export const withErrorHandler =
    action =>
    async (...args) => {
        try {
            return await action(...args)
        } catch (error) {
            return { error: error.message }
        }
    }
