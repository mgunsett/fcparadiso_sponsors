import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { club, hero as t } from '../data/content'
import { scrollToId } from '../hooks/useScrollTo'

const MotionBox = motion(Box)

export default function Hero() {
  return (
    <Box as="header" position="relative" minH="100svh" bg="brand.deep" color="brand.chalk" overflow="hidden">
      {/*
        IMAGEN DE FONDO PENDIENTE.
        Cuando esté lista: <Image src="/images/hero.webp" objectFit="cover" position="absolute" inset={0} ... />
        Mientras tanto, un fondo de césped tramado para que el hero no quede vacío.
      */}
      <Box
        position="absolute"
        inset={0}
        bgImage="repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 6vw, transparent 6vw 12vw)"
        bgColor="brand.deep"
      />
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-t, rgba(8,33,26,0.95) 0%, rgba(8,33,26,0.35) 45%, rgba(8,33,26,0.15) 100%)"
      />

      <Container maxW="80rem" position="relative" h="100svh" display="flex" flexDirection="column">
        <Flex pt={6} align="center" justify="space-between" fontFamily="heading" fontSize="sm" letterSpacing="0.06em">
          <Text>{club.name}</Text>
          <Text color="brand.mist">{club.league}</Text>
        </Flex>

        <MotionBox
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          pb={28}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Heading as="h1" fontSize={{ base: '3.4rem', md: '6.5rem', xl: '7.5rem' }} maxW="16ch">
            {t.title}
          </Heading>
          <Text mt={6} fontSize={{ base: 'md', md: 'xl' }} maxW="34rem" color="brand.mist">
            {t.subtitle}
          </Text>
          <Button mt={10} size="lg" variant="gold" px={10} h={14} fontSize="lg" onClick={() => scrollToId(t.ctaTarget)}>
            {t.cta}
          </Button>
        </MotionBox>
      </Container>
    </Box>
  )
}
