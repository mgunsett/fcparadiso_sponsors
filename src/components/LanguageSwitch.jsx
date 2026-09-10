import { Box, Flex, Icon } from '@chakra-ui/react'
import { FaGlobe } from 'react-icons/fa6'
import { languages, useI18n } from '../i18n'

// Botonera de idioma al lado de la hamburguesa: globo + IT/ES siempre a la vista,
// así se entiende de un vistazo qué es y en qué idioma estás.
// Mismo alto que el botón de menú (2.75rem); los segmentos son 2.25rem + 4px de padding.
export default function LanguageSwitch() {
  const { lang, setLang, content } = useI18n()

  return (
    <Flex
      role="group"
      aria-label={content.ui.langAria}
      flexShrink={0}
      align="center"
      h={11}
      p="4px"
      pl={{ base: 2.5, md: 3 }}
      gap={{ base: 2, md: 2.5 }}
      borderRadius="999px"
      bg="rgba(8,33,26,0.78)"
      border="1px solid rgba(244,246,241,0.3)"
      boxShadow="0 6px 18px rgba(8,33,26,0.45)"
      backdropFilter="blur(8px)"
    >
      <Icon as={FaGlobe} boxSize={{ base: 3.5, md: 4 }} color="brand.gold" aria-hidden />

      <Flex align="center" gap="3px">
        {languages.map((l) => {
          const active = l.code === lang
          return (
            <Box
              as="button"
              key={l.code}
              type="button"
              onClick={() => setLang(l.code)}
              aria-pressed={active}
              lang={l.code}
              title={l.name}
              h={9}
              minW={{ base: '2.25rem', md: '2.5rem' }}
              px={2}
              borderRadius="999px"
              fontFamily="heading"
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight={700}
              lineHeight={1}
              letterSpacing="0.08em"
              color={active ? 'brand.ink' : 'brand.chalk'}
              bg={active ? 'brand.gold' : 'transparent'}
              opacity={active ? 1 : 0.7}
              boxShadow={active ? '0 2px 10px rgba(227,194,76,0.45)' : 'none'}
              transition="background 200ms ease, color 200ms ease, opacity 200ms ease"
              _hover={{ opacity: 1, bg: active ? 'brand.gold' : 'rgba(244,246,241,0.16)' }}
              _focusVisible={{ outline: 'none', boxShadow: '0 0 0 3px rgba(227,194,76,0.55)' }}
            >
              {l.short}
            </Box>
          )
        })}
      </Flex>
    </Flex>
  )
}
