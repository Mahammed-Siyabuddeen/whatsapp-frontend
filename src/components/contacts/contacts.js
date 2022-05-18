import { Grid } from '@material-ui/core'
import React from 'react'
import { styles } from './styles'
function Contacts() {
    const classes = styles()
    
    return (
        <div className={classes.users_container}>
            <div className={classes.users_body}>
                userList
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                       <div className={classes.users_chat}>
                           
                       </div>
                    </Grid>
                    
                </Grid>
            </div>
        </div>
    )
}

export default Contacts