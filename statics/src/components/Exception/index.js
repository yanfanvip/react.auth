import React from 'react';
import IceContainer from '@icedesign/container';
import './index.scss';

export default (props) => {

  const styles = {
    exceptionContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: '18px',
      color: '#333',
    },
    description: {
      color: '#666',
    },
  };

  return (
    <div className="basic-not-found">
      <IceContainer>
        <div style={styles.exceptionContent} className="exception-content">
          <img src="https://img.alicdn.com/tfs/TB1ODH2GAvoK1RjSZPfXXXPKFXa-780-780.png" style={styles.image} className="imgException" alt="{props.statusCode}" />
          <div className="prompt">
            <h3 style={styles.title} className="title">{props.description}</h3>
          </div>
        </div>
      </IceContainer>
    </div>
  );
}

