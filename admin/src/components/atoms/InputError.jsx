export const InputError = ({ messages }) => {
    // Convert messages to an array if it's a string
    const errorMessages = Array.isArray(messages) ? messages : [messages]

    return (
        <div>
            {errorMessages.map((message, index) => (
                <div className="text-red-500 text-xs" key={index}>
                    {message}
                </div>
            ))}
        </div>
    )
}
