import {Button, Box, Text, Center, Image } from "@chakra-ui/react"
import {ethers} from 'ethers';
import React, { useState, useContext } from "react";
import { getAddress } from "../utils/metamask";
import { UserContext } from "../utils/UserContext";


export const ConnectWalletButton: React.FC = () => {
    //@ts-ignore
    const { user, setUser } = useContext(UserContext);

    // return <>
    return (
        <Center>
        <Button leftIcon={<Image maxH={'40px'} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png?20201112074605'}/>} colorScheme={user.address? 'orange': 'teal'} type='submit' className="connectButton" onClick={async () => await getAddress()} >
            {user.address? 'Wallet Connected': 'Connect Wallet'}
        </Button>
        </Center>
    )
}