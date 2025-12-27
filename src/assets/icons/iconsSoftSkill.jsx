import { FaUsers, FaClock, FaHandshake } from 'react-icons/fa';
// import { FaHandshake } from 'react-icons/fc';
import { RiEmpathizeFill } from 'react-icons/ri';

function getIcon(iconName) {
    switch (iconName) {
        case 'FaUsers':
            return <FaUsers className='iconHtml' size={'3rem'} />;
        case 'RiEmpathizeFill':
            return <RiEmpathizeFill  className='iconJava' size={'3rem'} />;
        case 'FaHandshake':
            return <FaHandshake className='iconCss' size={'3rem'} />;
        case 'FaClock':
            return <FaClock className='iconPy' size={'3rem'} />;
        
        default:
            return null;
    }
    
}
export default getIcon;