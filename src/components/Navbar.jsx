import { useEffect, useState } from 'react'
import { Box, Container, Flex, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { FaBars, FaXmark } from 'react-icons/fa6'
import { club, nav } from '../data/content'
import { scrollToId } from '../hooks/useScrollTo'

// Navbar clásico fijo arriba: escudo a la izquierda, liga y hamburguesa a la derecha.
// Arranca transparente sobre el Hero y toma fondo al scrollear, para seguir legible
// sobre las secciones claras. La sección visible se marca por IntersectionObserver.
export default function Navbar() {
  const [current, setCurrent] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setCurrent(visible.target.id)
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.2, 0.5] },
    )
    nav.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Box
      as="nav"
      aria-label="Secciones"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      color="brand.chalk"
      bg={scrolled ? 'rgba(8,33,26,0.82)' : 'transparent'}
      backdropFilter={scrolled ? 'blur(12px)' : 'none'}
      borderBottom="1px solid"
      borderColor={scrolled ? 'rgba(244,246,241,0.14)' : 'transparent'}
      transition="background 250ms ease, border-color 250ms ease"
    >
      <Container maxW="80rem">
        <Flex py={3} align="center" justify="space-between" fontFamily="heading" fontSize="sm" letterSpacing="0.06em">
          <Box
            as="button"
            type="button"
            onClick={() => scrollToId('home')}
            aria-label={`${club.name} · volver al inicio`}
            display="grid"
            placeItems="center"
            borderRadius="md"
            _focusVisible={{ outline: 'none', boxShadow: '0 0 0 3px rgba(227,194,76,0.55)' }}
          >
            <Image
              src={club.crest}
              alt=""
              boxSize={{ base: '2rem', md: '2.5rem' }}
              objectFit="contain"
              filter="drop-shadow(0 2px 12px rgba(8,33,26,0.6))"
              fallback={<Text>{club.name}</Text>}
            />
          </Box>

          <Flex align="center" gap={{ base: 3, md: 5 }}>
            <Text color="brand.mist" textShadow="0 1px 12px rgba(8,33,26,0.6)">
              {club.league}
            </Text>

            <Menu placement="bottom-end" autoSelect={false} isLazy>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    type="button"
                    aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                    display="grid"
                    placeItems="center"
                    boxSize={11}
                    borderRadius="999px"
                    color="brand.chalk"
                    bg="rgba(8,33,26,0.55)"
                    border="1px solid rgba(244,246,241,0.14)"
                    transition="background 200ms ease"
                    _hover={{ bg: 'rgba(8,33,26,0.9)' }}
                    _active={{ bg: 'rgba(8,33,26,0.9)' }}
                    _focusVisible={{ outline: 'none', boxShadow: '0 0 0 3px rgba(227,194,76,0.55)' }}
                  >
                    <Icon as={isOpen ? FaXmark : FaBars} boxSize={5} />
                  </MenuButton>

                  <MenuList
                    minW="13rem"
                    p={1.5}
                    mt={2}
                    borderRadius="1.5rem"
                    bg="rgba(8,33,26,0.92)"
                    backdropFilter="blur(12px)"
                    border="1px solid rgba(244,246,241,0.14)"
                    boxShadow="0 18px 44px rgba(8,33,26,0.5)"
                  >
                    {nav.map((n) => {
                      const active = current === n.id
                      return (
                        <MenuItem
                          key={n.id}
                          onClick={() => scrollToId(n.id)}
                          px={4}
                          py={2.5}
                          borderRadius="999px"
                          fontFamily="heading"
                          fontSize="md"
                          fontWeight={600}
                          letterSpacing="0.04em"
                          color={active ? 'brand.ink' : 'brand.chalk'}
                          bg={active ? 'brand.gold' : 'transparent'}
                          transition="background 200ms ease, color 200ms ease"
                          _hover={{ bg: active ? 'brand.gold' : 'rgba(244,246,241,0.1)' }}
                          _focus={{ bg: active ? 'brand.gold' : 'rgba(244,246,241,0.1)' }}
                          aria-current={active ? 'true' : undefined}
                        >
                          {n.label}
                        </MenuItem>
                      )
                    })}
                  </MenuList>
                </>
              )}
            </Menu>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
