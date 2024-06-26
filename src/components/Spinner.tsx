import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
    return (
        <div className="position-absolute top-50 start-50">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default LoadingSpinner;