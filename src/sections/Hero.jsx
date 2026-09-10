import { Box, Button, Container, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { hero as t } from '../data/content'
import { scrollToId } from '../hooks/useScrollTo'

const MotionBox = motion(Box)

export default function Hero() {
  return (
    <Box as="header" id="home" position="relative" minH="100svh" bg="brand.night" color="brand.chalk" overflow="hidden">
      {/*
        Foto de fondo (cancha + camiseta + lettering).
        La imagen es muy apaisada (≈1.9:1) y el arte vive abajo al centro, así que:
        - en desktop cubre todo el hero anclada al borde inferior,
        - en pantallas angostas se ancla abajo con un zoom por breakpoint, para que
          la camiseta y el león no queden recortados por un `cover` vertical.
      */}
      <Image
        src="/images/fondo_hero.webp"
        alt=""
        aria-hidden="true"
        position="absolute"
        bottom={0}
        top={{ base: 'auto', lg: 0 }}
        left="50%"
        transform="translateX(-50%)"
        w={{ base: '215%', sm: '165%', md: '128%', lg: '100%' }}
        h={{ base: 'auto', lg: '100%' }}
        maxW="none"
        objectFit="cover"
        objectPosition="center bottom"
      />

      {/* Velo superior: da contraste al texto y funde el borde de la foto en mobile. */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-b, rgba(8,33,26,0.92) 0%, rgba(8,33,26,0.6) 30%, rgba(8,33,26,0.12) 58%, rgba(8,33,26,0) 72%)"
      />

      <Container maxW="80rem" position="relative" minH="100svh" display="flex" flexDirection="column">
        <MotionBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          pt={{ base: 28, md: 32 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Heading
            as="h1"
            fontFamily="'Russo One', sans-serif"
            uppercase
            letterSpacing="-0.04em"
            lineHeight={0.9}
            textAlign="center"
            fontWeight="bold"
            fontSize={{ base: '2.75rem', md: '4.25rem', xl: '5rem' }}
            maxW="10ch"
            textShadow="0 2px 28px rgba(8,33,26,0.6)"

          >
            {t.title}
          </Heading>
          <Text
            mt={2}
            fontSize={{ base: 'sm', md: 'lg' }}
            maxW="32rem"
            color="brand.mist"
            textShadow="0 1px 16px rgba(8,33,26,0.7)"
          >
            {t.subtitle}
          </Text>
          <Flex mt={8} gap={3} wrap="wrap" justify="center">
            {t.ctas.map((c, i) => (
              <Button
                key={c.target}
                borderRadius="xl"
                size="lg"
                variant={i === 0 ? 'gold' : 'outlineChalk'}
                px={9}
                h={14}
                fontSize="md"
                minW="9.5rem"
                bg={i === 0 ? undefined : 'rgba(8,33,26,0.38)'}
                backdropFilter={i === 0 ? undefined : 'blur(6px)'}
                onClick={() => scrollToId(c.target)}
              >
                {c.label}
              </Button>
            ))}
          </Flex>
        </MotionBox>
      </Container>
    </Box>
  )
}
