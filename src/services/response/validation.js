export default {
    hasValidationErrors(error) {
        return (
            error &&
            error.response &&
            error.response.status === 400 &&
            error.response.data &&
            error.response.data.error === "ValidationException"
        );
    }
};
