import React, { useEffect } from "react";
import {Switch, Paper, Typography} from "@mui/material";
import queryService from "src/services/restapi/DigQuery";
import isValidDomain from 'is-valid-domain';

// custom
import { QueryResponse } from 'src/types/interfaces';
import {UserStateContext} from 'src/states/GlobalContext';

function DNSRecordDefault(props: any) {
  const usrStateContext = React.useContext(UserStateContext);
  console.log('DigReco test: ', usrStateContext.usrState);

    const [rawView, setRawView] = React.useState(false);
    const handleSwitchChange = (event: React.ChangeEvent<{}>, value: boolean) => {
        setRawView(value);
    };
    const [rawData, setRawData] = React.useState([""]);
    const [answerData, setAnswerData] = React.useState([""]);
    
    useEffect(()=>{
        let isMounted = true;  
        if (props.domain.length > 0 && isValidDomain(props.domain)) {
            // todo: complete queryService
            queryService.lookup("", "").then((resp: any) => {
              if (resp.result !== null) {
                const data: any = resp.result.data;
                if (data.Answer.length > 0 && isMounted) {
                setAnswerData(data.Answer);
                }
                if (data.RawData.length > 0 && isMounted) {
                setRawData(data.RawData);
                }
              } else if (resp.reject !== null) {
                //
              } else {
                // resp.error !== null
              }
            }, (reason: QueryResponse) => {

            });
        }
        return () => {
            isMounted = false;
        }
    },[props.domain, props.qType]);
  
    return (
    <>
      <h3 style={{ marginTop: "5vh" }}>{props.title}</h3>
      <Paper variant="outlined" >
        {answerData ? answerData.map((line, index) => <Typography variant="subtitle2" key={index}>{line}</Typography> ) : null}
        </Paper>
      <br/>
      <Switch
        onChange={handleSwitchChange}
        color="secondary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <span>Raw View</span>
      <Paper variant="outlined" >
      {rawView ?  rawData.map((line, index) => <Typography variant="subtitle2" key={index}>{line}</Typography> ) : null}
      </Paper>
    </>
    );
  }

  export default DNSRecordDefault