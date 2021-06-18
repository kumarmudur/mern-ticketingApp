import 'bootstrap/dist/css/bootstrap.css';

import buildClient from '../api/build-client';

const AppComponent = ({ Component, pageProps }) => {
    return (
        <div>
            <Component { ...pageProps }/>
        </div>
    )
};

AppComponent.getInitialProps = () => {

};

export default AppComponent;