import { Box, Container, Flex, Grid, Heading, Link, Text } from '@chakra-ui/react'
import { FaWhatsapp, FaInstagram, FaEnvelope, FaUserTie } from 'react-icons/fa6'
import { contact as t, club } from '../data/content'
import { useQuoteContext } from '../hooks/useScrollTo'

const icons = { whatsapp: FaWhatsapp, mail: FaEnvelope, instagram: FaInstagram, marketing: FaUserTie }

function withContext(href, ctx) {
  if (!ctx) return href
  const subject = ctx.sector ? `Presupuesto espacio ${ctx.sector}` : `Consulta plan ${ctx.plan}`
  if (href.startsWith('https://wa.me/')) {
    const base = href.split('?')[0]
    return `${base}?text=${encodeURIComponent(`Hola, quiero pedir ${subject.toLowerCase()} en ${club.name}.`)}`
  }
  if (href.startsWith('mailto:')) {
    const base = href.split('?')[0]
    return `${base}?subject=${encodeURIComponent(`${subject} · ${club.name}`)}`
  }
  return href
}

export default function Contact() {
  const ctx = useQuoteContext()

  return (
    <Box as="section" id="contacto" border="1px solid rgba(15,61,34,0.12)" bg="brand.chalk" py={{ base: 16, md: 24 }}>
      <Container maxW="80rem">
        <Grid
          templateColumns={{ base: '1fr', md: '2fr 3fr' }}
          bg="brand.night"
          color="brand.chalk"
          overflow="hidden"
          borderRadius="xl"
          minH={{ md: '34rem' }}
        >
          {/* Panel fotográfico: tribuna lateral con velo verde, a la manera de la referencia */}
          <Box
            position="relative"
            minH={{ base: '16rem', md: 'auto' }}
            bgImage="url(/images/stand-side.webp)"
            bgSize="cover"
            bgPosition="center 70%"
          >
            <Box position="absolute" inset={0} bg="linear-gradient(160deg, rgba(30,122,60,0.55), rgba(8,33,26,0.85))" />
            <Box position="absolute" left={{ base: 5, md: 8 }} bottom={{ base: 5, md: 8 }} right={5}>
              <Text fontFamily="heading" fontSize="sm" letterSpacing="0.06em" color="brand.chalk">
                {club.city}
              </Text>
              <Heading as="h2" fontFamily="'Russo One', sans-serif" fontWeight='normal' lineHeight={0.9} fontSize={{ base: '2.5rem', md: '3.75rem' }} color="brand.gold" mt={1}>
                {t.title}
              </Heading>
              <Text mt={3} color="brand.mist" maxW="22rem">
                {t.intro}
              </Text>
            </Box>
          </Box>

          {/* Canales: filas grandes, sin formulario */}
          <Flex direction="column" justify="center" p={{ base: 5, md: 10, lg: 14 }} gap={2}>
            {ctx && (
              <Text mb={4} fontFamily="heading" fontSize="sm" letterSpacing="0.06em" color="brand.gold">
                {ctx.sector ? `Consulta sobre el espacio ${ctx.sector}` : `Consulta sobre el plan ${ctx.plan}`}
              </Text>
            )}
            {t.channels.map((c) => {
              const Icon = icons[c.id]
              return (
                <Link
                  key={c.id}
                  href={withContext(c.href, ctx)}
                  isExternal={!c.href.startsWith('mailto:')}
                  display="grid"
                  gridTemplateColumns="2.75rem 1fr auto"
                  alignItems="center"
                  gap={4}
                  py={5}
                  borderBottom="1px solid rgba(244,246,241,0.12)"
                  _hover={{ textDecoration: 'none', '& .arrow': { transform: 'translateX(6px)', color: 'brand.gold' } }}
                  _focusVisible={{ outline: 'none', boxShadow: '0 0 0 3px rgba(227,194,76,0.55)' }}
                >
                  <Flex w="2.75rem" h="2.75rem" align="center" justify="center" borderRadius="50%" bg="rgba(244,246,241,0.08)" color="brand.gold">
                    <Icon size={20} />
                  </Flex>
                  <Box>
                    <Text fontFamily="heading" fontSize="sm" letterSpacing="0.06em" color="brand.mist">
                      {c.label}
                    </Text>
                    <Text fontFamily="Russo One, sans-serif" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={'normal'} color="brand.chalk">
                      {c.value}
                    </Text>
                  </Box>
                  <Text className="arrow" fontSize="2xl" transition="transform 200ms ease, color 200ms ease" aria-hidden>
                    ↗
                  </Text>
                </Link>
              )
            })}
          </Flex>
        </Grid>
      </Container>
    </Box>
  )
}
