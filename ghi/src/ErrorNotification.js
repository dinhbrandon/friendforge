function ErrorNotification(props) {
    if (!props.error) {
        return null;
    }

    return (
        <div className="notification is-danger">
            {props.error}
        </div>
    );
}

export default ErrorNotification;
