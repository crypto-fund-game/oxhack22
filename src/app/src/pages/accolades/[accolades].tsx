import Head from 'next/head'
import {
  Link as ChakraLink,
  Text,
  Tabs,
  TabList, 
  TabPanels,
  TabPanel,
  Tab,
  SimpleGrid,
  Wrap,
  WrapItem,
  Heading
} from '@chakra-ui/react'

import { Container } from '../../components/Container'
import { Main } from '../../components/Main'
import { Footer } from '../../components/Footer'
import { IntegrationCard } from '../../components/IntegrationCard'
import { AccoladeCard } from '../../components/AccoladeCard'
import { Header } from '../../components/Header'
import { GetServerSideProps } from 'next'
import { ethers } from 'ethers'

// interface TabData {
//     label: string,
//     content: string
// }

//@ts-ignore 
const Accolades = ({accolades}) => {
  console.log(accolades)
  return (
  <Container height="100vh">
    <Head>
      <title>My Accolades </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Heading>My Accolades</Heading>
    <Main>
      {/* <Integrations/> */}
      <Wrap spacing={{ base: 5, lg: 8 }} justify='center'>
        {/* @ts-ignore */}
          {["spotify", "oxhack", "redcross", "strava"].map( data => accolades[data].map(datum => <WrapItem key={datum} >
            <AccoladeCard 
              title={datum.name} 
              companyName={data} 
              imageUrl={datum.image_url} 
              description={datum.description}
              categories={[]}
              companyLogoUrl={''} /></WrapItem>))}
      </Wrap>
    </Main>

    <Footer>
      <Text>Courtesy of the best OxHack22 Team ❤️</Text>
    </Footer>
  </Container>
)}

export default Accolades

// @ts-ignore
export async function getServerSideProps(context) {

  // return {props: {accolades :{ "spotify": [ { "name": "Lex Fridman Podcast Superfan — 2021", "image_url": "https://raw.githubusercontent.com/mbiss10/oxhack22/main/spotify_achievement_images/lex.png", "description": "The Lex Fridman Podcast was your most listened-to podcast this year!" }, { "name": "Tastemaker", "image_url": "https://raw.githubusercontent.com/mbiss10/oxhack22/main/spotify_achievement_images/taste.png", "description": "You created a playlist that amassed over 20 followers. You must have good taste!" }, { "name": "Eclectic Ears", "image_url": "https://raw.githubusercontent.com/mbiss10/oxhack22/main/spotify_achievement_images/ears.png", "description": "You listened to songs from 15 different genres this year!" } ], "oxhack": [], "redcross": [], "strava": [] }}}

  const { getAccoladesByContract } = require("../../lib/getaccs");
  const { signets } = require('../../lib/signets.json');

  const provider = new ethers.providers.JsonRpcProvider(process.env.RINKEBY_URL);

  const { abi } = require("../../lib/abi.json");

  const address = context.query.accolades.toLowerCase();
  const accolades = new Object();

  for (let contractAddr in signets) {

    const contract = new ethers.Contract(
      contractAddr,
      abi,
      provider,
    );

    let tokens = await getAccoladesByContract(address, contract);

    if (tokens === null) {
      console.error(`could not get accolades for ${signets[contractAddr]}`);
      tokens = [];
    }

    // @ts-ignore
    accolades[signets[contractAddr]] = tokens;
  }

  console.log(JSON.stringify(accolades, null, 2))

  return {
    props: {
      accolades,
    }
  }
}