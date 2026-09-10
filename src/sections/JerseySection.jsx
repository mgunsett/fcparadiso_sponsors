import { useCallback, useRef, useState } from 'react'
import { Box, Button, Container, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import JerseyScene from '../scenes/JerseyScene'
import { jerseySectors, jerseySection as t } from '../data/content'
import { scrollToId } from '../hooks/useScrollTo'

const MotionBox = motion(Box)

const angleDistance = (a, b) => {
  const d = Math.abs(((a - b) % 360) + 360) % 360
  return Math.min(d, 360 - d)
}

function Callout({ sector, side, active, onClick, index }) {
  const isLeft = side === 'left'
  return (
    <MotionBox
      as="button"
      type="button"
      onClick={onClick}
      textAlign={isLeft ? 'right' : 'left'}
      position="relative"
      w="100%"
      p={4}
      pr={isLeft ? 7 : 4}
      pl={isLeft ? 4 : 7}
      bg={active ? 'brand.gold' : 'white'}
      color={active ? 'brand.ink' : 'brand.ink'}
      border="1px solid"
      borderColor={active ? 'brand.gold' : 'rgba(15,61,34,0.18)'}
      borderRadius="2px"
      sx={{ transition: 'background 200ms ease, border-color 200ms ease' }}
      _hover={{ borderColor: 'brand.gold' }}
      _focusVisible={{ outline: 'none', boxShadow: '0 0 0 3px rgba(227,194,76,0.55)' }}
      initial={{ opacity: 0, x: isLeft ? -18 : 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      aria-pressed={active}
    >
      {/* Flecha hacia la camiseta */}
      <Box
        aria-hidden
        position="absolute"
        top="50%"
        {...(isLeft ? { right: '-28px' } : { left: '-28px' })}
        w="28px"
        h="1px"
        bg={active ? 'brand.gold' : 'brand.deep'}
        _after={{
          content: '""',
          position: 'absolute',
          top: '-3px',
          [isLeft ? 'right' : 'left']: '-2px',
          w: '7px',
          h: '7px',
          borderRadius: '50%',
          bg: active ? 'brand.gold' : 'brand.deep',
        }}
      />
      <Text fontFamily="heading" fontSize="sm" color={active ? 'brand.ink' : 'brand.grass'} letterSpacing="0.06em">
        {sector.id} · {sector.size}
      </Text>
      <Text fontFamily="heading" fontSize="xl" fontWeight={600} lineHeight={1.1} mt={1}>
        {sector.name}
      </Text>
      <Text fontSize="sm" mt={1} color={active ? 'brand.ink' : 'gray.600'}>
        {sector.note}
      </Text>
    </MotionBox>
  )
}

export default function JerseySection() {
  const rig = useRef(null)
  const [angle, setAngle] = useState(0)
  const onAngle = useCallback((deg) => setAngle((prev) => (Math.abs(prev - deg) < 2 ? prev : deg)), [])

  const activeId =
    jerseySectors
      .map((s) => ({ id: s.id, d: angleDistance(angle, s.angle) }))
      .filter((s) => s.d < 40)
      .sort((a, b) => a.d - b.d)[0]?.id ?? null

  const left = jerseySectors.filter((s) => s.side === 'left')
  const right = jerseySectors.filter((s) => s.side === 'right')
  const activeSector = jerseySectors.find((s) => s.id === activeId)

  return (
    <Box as="section" id="camiseta" bg="white" py={{ base: 16, md: 24 }}>
      <Container maxW="80rem">
        <Box maxW="36rem">
          <Heading as="h2" fontFamily="'Russo One', sans-serif" fontWeight='normal' lineHeight={0.9} fontSize={{ base: '2.5rem', md: '3.75rem' }} color="brand.deep">
            {t.title}
          </Heading>
          <Text mt={4} fontSize="lg" color="gray.700">
            {t.intro}
          </Text>
        </Box>

        <Grid
          mt={{ base: 8, md: 12 }}
          templateColumns={{ base: '1fr', lg: '18rem minmax(0,1fr) 18rem' }}
          gap={{ base: 6, lg: 10 }}
          alignItems="center"
        >
          <Flex direction="column" gap={4} display={{ base: 'none', lg: 'flex' }}>
            {left.map((s, i) => (
              <Callout key={s.id} sector={s} side="left" index={i} active={s.id === activeId} onClick={() => rig.current?.rotateTo(s.angle)} />
            ))}
          </Flex>

          <Box position="relative" h={{ base: '26rem', md: '34rem', lg: '38rem' }}>
            <Box position="absolute" inset={0}>
              <JerseyScene ref={rig} onAngle={onAngle} />
            </Box>
            <Text
              position="absolute"
              top={4}
              left={4}
              fontFamily="heading"
              fontSize="xs"
              letterSpacing="0.08em"
              color="gray.500"
              pointerEvents="none"
            >
              {t.modelNote}
            </Text>
            <Text
              position="absolute"
              bottom={4}
              left="50%"
              transform="translateX(-50%)"
              fontFamily="heading"
              fontSize="sm"
              letterSpacing="0.08em"
              color="brand.grass"
              pointerEvents="none"
            >
              ⟲ {t.dragHint}
            </Text>
          </Box>

          <Flex direction="column" gap={4} display={{ base: 'none', lg: 'flex' }}>
            {right.map((s, i) => (
              <Callout key={s.id} sector={s} side="right" index={i} active={s.id === activeId} onClick={() => rig.current?.rotateTo(s.angle)} />
            ))}
          </Flex>
        </Grid>

        {/* Mobile / tablet: los recuadros pasan a una lista debajo de la camiseta */}
        <Flex mt={6} gap={3} overflowX="auto" display={{ base: 'flex', lg: 'none' }} pb={2}>
          {jerseySectors.map((s) => {
            const active = s.id === activeId
            return (
              <Button
                key={s.id}
                flexShrink={0}
                size="sm"
                variant={active ? 'gold' : 'outlineDeep'}
                onClick={() => rig.current?.rotateTo(s.angle)}
              >
                {s.id} · {s.name}
              </Button>
            )
          })}
        </Flex>

        <Flex mt={{ base: 8, md: 10 }} align="center" justify="space-between" wrap="wrap" gap={4}>
          <Text color="gray.700">
            {activeSector ? (
              <>
                Estás viendo <strong>{activeSector.name}</strong> · {activeSector.size}
              </>
            ) : (
              'Girá la camiseta hasta el espacio que te interese.'
            )}
          </Text>
          <Button
            variant="gold"
            size="lg"
            onClick={() => scrollToId('contacto', activeSector ? { sector: activeSector.id } : null)}
          >
            {t.quoteCta}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
