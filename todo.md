# Funcionalidades Full-Stack — Assistants Consulting

## Fase 1: Upgrade e Banco de Dados
- [x] Executar webdev_add_feature (web-db-user)
- [x] Criar schema do banco: contacts, articles, newsletter_subscribers, chat_messages
- [x] Rodar migrations

## Fase 2: Formulário de Contato
- [x] Criar endpoint POST /api/contacts para receber mensagens
- [x] Salvar mensagens no banco de dados
- [x] Conectar formulário frontend ao endpoint tRPC
- [x] Feedback visual de sucesso/erro no formulário
- [x] Notificar owner quando novo contato chegar

## Fase 3: Painel Admin (Insights)
- [x] Criar rota /admin protegida por autenticação (role admin)
- [x] CRUD de artigos (criar, editar, publicar, despublicar)
- [x] Editor de conteúdo com formatação básica (markdown)
- [x] Listar artigos com status (rascunho/publicado)
- [x] Página Insights consumir artigos do banco de dados
- [x] Painel para visualizar mensagens de contato recebidas

## Fase 4: Newsletter
- [x] Criar endpoint POST /api/newsletter para captura de e-mails
- [x] Formulário de inscrição no footer e página Insights
- [x] Armazenar subscribers no banco
- [x] Painel admin para visualizar inscritos

## Fase 5: Chat com IA
- [x] Criar endpoint POST /api/chat para mensagens
- [x] Integrar com LLM (BUILT_IN_FORGE_API)
- [x] Definir system prompt com conhecimento da Assistants
- [x] Componente de chat flutuante no frontend
- [x] Histórico de conversas por sessão
- [x] Sugestões de perguntas rápidas
- [x] Fallback para contato humano quando necessário

## Testes
- [x] Testes vitest para validação de inputs (contacts, newsletter, chat)
- [x] Testes de controle de acesso (admin vs user vs público)
- [x] 15 testes passando (100%)

## Fase 6: Internacionalização (PT/EN)
- [x] Criar sistema de i18n com contexto React e toggle de idioma
- [x] Criar arquivo de traduções PT-BR completo
- [x] Criar arquivo de traduções EN completo (tradução juramentada com terminologia atuarial)
- [x] Adicionar toggle de idioma no Header
- [x] Traduzir todas as páginas (Home, Serviços, Sobre, Clientes, Insights, Contato)
- [x] Traduzir componentes compartilhados (Footer, ChatWidget)

## Fase 7: Refinamentos Finais
- [x] Responsividade mobile cirúrgica (verificar todos os breakpoints)
- [x] Animações do chat (typing indicator, entrada escalonada)
- [x] SEO dinâmico com meta tags Open Graph por página
- [x] Preview de markdown no editor admin (split-view)
- [x] Performance: lazy loading de imagens, code splitting por rota
- [x] Dark mode avaliado: não implementado por incoerência com Brand Book

## Fase 8: Identidade Visual Oficial e Admin
- [x] Upload de todos os assets oficiais (imagens temáticas, wordmark, símbolo, favicon)
- [x] Substituir imagens genéricas pelas oficiais em todas as páginas
- [x] Integrar wordmark oficial no Header e Footer
- [x] Configurar favicon oficial
- [x] Adicionar suporte ao Google Search Console (meta tag de verificação)
- [x] Melhorar interface do painel admin (mais amigável e intuitiva)

## Fase 9: Formulário de Contato Detalhado
- [x] Adicionar campos: cargo, setor de atuação, tipo de serviço desejado, urgência, como conheceu a empresa, contato preferido
- [x] Atualizar schema do banco para suportar novos campos (migration 0003)
- [x] Atualizar endpoint tRPC para aceitar os novos campos
- [x] Redesenhar layout do formulário com UX aprimorada (multi-step 3 etapas)
- [x] Manter i18n (PT/EN) nos novos campos
- [x] Testar envio e visualização no admin (15 testes passando)
