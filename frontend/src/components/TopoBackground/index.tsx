import './index.css';
import TopoBg from '../../assets/topo-bg.svg';

import { Image } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function TopoBackground() {
    return (
        <>
            <div className="topo">
                <Image className="topo-background" src={TopoBg} title="topo-background" />
            </div>
        </>
    );
}
