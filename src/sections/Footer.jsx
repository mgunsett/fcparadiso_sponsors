import { Box, Container, Flex, Image, Link, Text } from '@chakra-ui/react'
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa6'
import { useContent } from '../i18n'
import { scrollToId } from '../hooks/useScrollTo'

const icons = { instagram: FaInstagram, facebook: FaFacebook, youtube: FaYoutube }

export default function Footer() {
  const { club, footer: t, nav, ui } = useContent()

  return (
    <Box as="footer" bg="brand.night" color="brand.chalk" pt={{ base: 12, md: 16 }} pb={{ base: 28, md: 24 }}>
      <Container maxW="80rem">
        <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap={8}>
          <Flex align="center" gap={4}>
            <Image src={club.crest} alt={`${ui.crestAlt} ${club.name}`} boxSize="56px" fallback={<Box boxSize="56px" borderRadius="50%" border="1px dashed" borderColor="brand.mist" />} />
            <Box>
              <Text fontFamily="heading" fontSize="2xl" fontWeight={600} lineHeight={1}>
                {club.name}
              </Text>
              <Text fontSize="sm" color="brand.mist">{club.league}</Text>
            </Box>
          </Flex>

          <Flex as="ul" listStyleType="none" gap={{ base: 4, md: 8 }} fontFamily="heading" fontSize="md" letterSpacing="0.04em" wrap="wrap">
            {nav.map((n) => (
              <li key={n.id}>
                <Link onClick={() => scrollToId(n.id)} _hover={{ color: 'brand.gold', textDecoration: 'none' }}>
                  {n.label}
                </Link>
              </li>
            ))}
          </Flex>

          <Flex gap={3}>
            {t.socials.map((s) => {
              const Icon = icons[s.id]
              return (
                <Link
                  key={s.id}
                  href={s.href}
                  isExternal
                  aria-label={s.id}
                  display="flex"
                  w="2.5rem"
                  h="2.5rem"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="50%"
                  border="1px solid rgba(244,246,241,0.2)"
                  _hover={{ bg: 'brand.gold', color: 'brand.ink', borderColor: 'brand.gold' }}
                >
                  <Icon size={16} />
                </Link>
              )
            })}
          </Flex>
        </Flex>

        <Flex mt={12} pt={6} borderTop="1px solid rgba(244,246,241,0.12)" justify="space-between" direction={{ base: 'column', md: 'row' }} gap={2} fontSize="sm" color="brand.mist">
          <Text>{t.rights}</Text>
          <Link href={t.creditHref} _hover={{ color: 'brand.gold' }}>
            {t.credit}
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
