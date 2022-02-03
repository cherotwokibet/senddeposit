
import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Typography,
    Avatar
} from '@mui/material'

import { DeleteOutlined } from '@mui/icons-material'
import { green, red } from '@mui/material/colors';

const avatarColors = (transaction)=> {
    if(transaction.type === 'send') {
        return red[700]
    }
    if(transaction.type === 'deposit') {
        return green[500]
    }
    
}


export default function TransactionsCard ({transaction,handleDelete}) {


    return (
        <div>
            <Card elevation={1}>
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{
                                background:avatarColors(transaction)
                            }}
                        >
                            {transaction.type[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={()=>handleDelete(transaction.id)}>
                            <DeleteOutlined/>          
                        </IconButton>
                    }
                    title={transaction.name}
                    subheader={transaction.type}
                />
                <CardContent>
                    <Typography variant='body2' color='textSecondary' sx={{fontWeight:'bold'}}>
                        {transaction.amount}
                    </Typography>
                </CardContent>

            </Card>
        </div>
    )
}


