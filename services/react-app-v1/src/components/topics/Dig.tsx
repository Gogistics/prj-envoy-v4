import React from 'react';
import { Tabs, Tab } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Switch, Route, Link, useHistory } from "react-router-dom";

// custom
import DigTabs from 'src/data/DigTabs';
import DigRecordDefault from './contents/DigRecordDefault';

export default function Dig(props: any) {

    // todo: pass by props
    const domain = '';

    const {match} = props;
    const history = useHistory();
    const [currTabPath, setCurrTabPath] = React.useState(false);
    const handleTabChange = (event: React.ChangeEvent<{}>,value: any) => {
      setCurrTabPath(value);
    };

    React.useEffect(() => {
        let pathname:any = history.location.pathname;
    
        if (pathname.indexOf('/dig') === -1) {
            setCurrTabPath(false);
        } else {
            pathname = pathname.replace('/dig', '');
            const currPath = DigTabs.filter((tab:any) => tab.path === pathname);
            if (currPath.length > 0) {
                setCurrTabPath(pathname);
            } else {
                setCurrTabPath(false);
            }
        }
    }, [history]);

    return (
        <>
            <Typography paragraph>
            The dig command in Linux is used to gather DNS information. It stands for Domain Information Groper, and it collects data about Domain Name Servers. The dig command is helpful for diagnosing DNS problems, but is also used to display DNS information.
            </Typography>
            <Tabs
                value={currTabPath}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs"
                onChange={handleTabChange}
                indicatorColor="secondary"
                textColor="secondary"
            >
                {/** DNS record tabs */}
                {DigTabs.map((tab) => {
                    return <Tab
                    key={tab.path}
                    value={tab.path}
                    label={tab.label}
                    component={Link}
                    to={`${match.url}${tab.path}`}
                    />
                })}
            </Tabs>

            {/** section of query result */}
            <Switch>
                {DigTabs.map(tab => {
                return (
                    <Route
                        key={tab.path}
                        path={`${match.url}${tab.path}`}
                        render={(props: any) => {
                            return <DigRecordDefault {...props} title={tab.title} domain={domain} qType={tab.qType} />
                        }}
                    />
                )
                })}
            </Switch>
        </>
    )
}