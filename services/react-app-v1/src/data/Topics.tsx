import Dig from '../components/topics/Dig';
import Host from '../components/topics/Host';
import Netcat from '../components/topics/Netcat';
import Nmap from '../components/topics/Nmap';
import Traceroute from '../components/topics/Traceroute';

import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import ExploreIcon from '@mui/icons-material/Explore';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import ComputerIcon from '@mui/icons-material/Computer';

const topics = [
    {
        path: '/dig',
        label: 'dig',
        title: 'Dig',
        getComponent: (props: any) => {
            return <Dig {...props} />
        },
        getIcon: () => {
            return <ExploreIcon/>
        }
    },
    {
        path: '/host',
        label: 'host',
        title:'Host',
        getComponent: (props: any) => {
            return <Host {...props} />
        },
        getIcon: () => {
            return <ComputerIcon/>
        }
    },
    {
        path: '/traceroute',
        label: 'traceroute',
        title: 'TraceRoute',
        getComponent: (props: any) => {
            return <Traceroute {...props} />
        },
        getIcon: () => {
            return <LinearScaleIcon/>
        }
    },
    {
        path: '/nc',
        label: 'nc',
        title: 'Netcat',
        getComponent: (props: any) => {
            return <Netcat {...props} />
        },
        getIcon: () => {
            return <FindInPageIcon/>
        }
    },
    {
        path: '/nmap',
        label: 'nmap',
        title: 'Nmap',
        getComponent: (props: any) => {
            return <Nmap {...props} />
        },
        getIcon: () => {
            return <DomainVerificationIcon />
        }
    },
];
export default topics;