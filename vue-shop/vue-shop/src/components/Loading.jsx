import './Loading.css';

const Loading = ({ type = 'grid' }) => {
  if (type === 'grid') {
    return (
      <div className="loading-grid">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton skeleton-text skeleton-text-sm"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text skeleton-text-md"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (type === 'product') {
    return (
      <div className="loading-product">
        <div className="skeleton skeleton-image-large"></div>
        <div className="skeleton-details">
          <div className="skeleton skeleton-text skeleton-text-lg"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text skeleton-text-md"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;