# Site profissional — Isaac Brasil

Site estático (HTML, CSS e JavaScript puros), sem dependências, banco de dados ou etapa de build. Pode ser publicado gratuitamente no GitHub Pages.

## Estrutura dos arquivos

```
isaac-brasil-site/
├── index.html            ← todo o conteúdo do site (textos, seções, links)
├── styles.css            ← aparência (cores, fontes, espaçamentos)
├── script.js             ← menu móvel, formulário de contato e e-mail configurável
├── robots.txt            ← permite a indexação por mecanismos de busca
├── .nojekyll             ← evita processamento extra no GitHub Pages
└── assets/
    ├── favicon.svg            ← ícone da aba do navegador
    ├── favicon-32.png         ← ícone alternativo (navegadores antigos)
    ├── apple-touch-icon.png   ← ícone para celulares
    └── og-image.png           ← imagem exibida ao compartilhar o link (1200×630)
```

Para visualizar no computador, basta abrir `index.html` no navegador.

---

## 1. Editar o conteúdo

Todo o texto fica em `index.html`, organizado em blocos comentados:

| Comentário no arquivo        | Seção                         |
|------------------------------|-------------------------------|
| `A — INÍCIO`                 | Chamada principal e botões    |
| `B — SOBRE`                  | Biografia e formação          |
| `C — PALESTRAS`              | Os três cartões de palestras  |
| `D — OFICINAS`               | As três oficinas              |
| `E — COMO TRABALHO`          | As quatro etapas              |
| `F — PESQUISA`               | Pesquisa e canais             |
| `G — CONTATO`                | Formulário                    |

Dicas:

- Edite apenas o texto entre as marcações (`<p>…</p>`, `<h3>…</h3>` etc.), mantendo as marcações.
- **Ao criar ou renomear uma palestra ou oficina**, atualize o título em três lugares: no `<h3>` do cartão, no atributo `data-tema="…"` do botão "Consultar disponibilidade" e na lista `<select id="f-tema">` do formulário. Os três textos devem ser idênticos para que o botão preencha o tema automaticamente.
- Para trocar as cores, altere as variáveis no topo de `styles.css` (`--navy-800`, `--accent` etc.).

### Inserir seu e-mail profissional

Abra `script.js` e preencha a linha do início:

```js
const CONTACT_EMAIL = "contato@seudominio.com.br";
```

Com o e-mail preenchido, o site passa a exibir automaticamente o endereço na seção de contato e o botão **"Abrir no aplicativo de e-mail"**, que abre o programa de e-mail do visitante com a mensagem já preenchida. Enquanto o campo estiver vazio, o visitante pode copiar a mensagem montada e enviá-la pelo LinkedIn.

> O formulário **não envia mensagens sozinho** e não armazena dados: ele apenas monta o texto. Isso evita depender de serviços pagos ou externos. Se, no futuro, você quiser envio direto, é possível conectar um serviço como Formspree ou Web3Forms — ambos oferecem planos gratuitos, mas exigem cadastro.

## 2. Substituir a fotografia

1. Salve sua foto como `assets/foto-isaac.jpg` (formato retrato, cerca de 800×1000 px, até ~300 KB).
2. Em `index.html`, procure o comentário `FOTOGRAFIA PROFISSIONAL`.
3. Substitua o bloco

   ```html
   <div class="portrait-placeholder" role="img" aria-label="Espaço reservado para a fotografia de Isaac Brasil">
     <span aria-hidden="true">IB</span>
   </div>
   ```

   por

   ```html
   <img src="assets/foto-isaac.jpg" alt="Retrato de Isaac Brasil" width="800" height="1000">
   ```

No celular, a foto aparece recortada em formato quadrado; prefira uma imagem com o rosto centralizado.

## 3. Atualizar os links

Os links aparecem em vários pontos (início, sobre, pesquisa e rodapé). Para trocar todos de uma vez, use a função **Localizar e substituir** do seu editor (no VS Code: `Ctrl+Shift+H`) em `index.html`:

- Lattes: `https://buscatextual.cnpq.br/buscatextual/visualizacv.do`
- LinkedIn: `https://www.linkedin.com/in/isaac-brasil-27abb013a/`
- Substack: `https://isaacbrasil.substack.com/`

> **Atenção ao Lattes:** o endereço atual abre a página genérica de consulta da Plataforma Lattes, não o seu currículo. Para apontar diretamente para ele, abra seu currículo no Lattes, copie o endereço completo da barra do navegador (algo como `http://lattes.cnpq.br/0000000000000000`) e substitua o link acima.

Os links do LinkedIn e do Substack também aparecem no bloco `"sameAs"` (dados estruturados para buscadores), no início de `index.html`. Ao obter o link direto do Lattes, adicione-o ali também.

## 4. Publicar no GitHub Pages (gratuito)

1. Crie uma conta em [github.com](https://github.com), se ainda não tiver.
2. Clique em **New repository**. Sugestão de nome: `seuusuario.github.io` (o site ficará em `https://seuusuario.github.io`). Qualquer outro nome também funciona — o endereço será `https://seuusuario.github.io/nome-do-repositorio/`.
3. Marque o repositório como **Public** e clique em **Create repository**.
4. Na página do repositório, clique em **Add file → Upload files** e arraste **todo o conteúdo da pasta** (`index.html`, `styles.css`, `script.js`, `robots.txt`, `.nojekyll` e a pasta `assets`). O `index.html` precisa ficar na raiz, e não dentro de outra pasta.
   - O arquivo `.nojekyll` pode ficar oculto no seu computador. Se não conseguir enviá-lo, o site funciona da mesma forma.
5. Clique em **Commit changes**.
6. Vá em **Settings → Pages**. Em **Build and deployment**, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)` e clique em **Save**.
7. Após alguns minutos, o endereço do site aparecerá no topo dessa página.

Para atualizar o site depois, edite os arquivos diretamente no GitHub (ícone de lápis) ou envie novas versões pelo **Upload files**.

### Depois de publicar: ajustes de SEO e compartilhamento

Em `index.html`, no início do arquivo:

1. Remova os marcadores de comentário (`<!--` e `-->`) das linhas `canonical` e `og:url` e troque `https://SEU-ENDERECO/` pelo endereço real.
2. Troque `content="assets/og-image.png"` pelo endereço completo, por exemplo `content="https://seuusuario.github.io/assets/og-image.png"`. LinkedIn e WhatsApp só exibem a imagem de pré-visualização com o endereço completo.
3. Cadastre o site no [Google Search Console](https://search.google.com/search-console) para acompanhar a indexação. O tempo até o site aparecer nas buscas varia e não é garantido.

## 5. Domínio personalizado (GitHub Pages + Registro.br)

Exemplo com o domínio `isaacbrasil.com.br`.

### No Registro.br

1. Registre o domínio em [registro.br](https://registro.br).
2. No painel do domínio, abra **DNS** → **Configurar zona DNS** (use os servidores DNS do próprio Registro.br).
3. Crie os registros abaixo:

| Tipo  | Nome  | Valor                     |
|-------|-------|---------------------------|
| A     | (vazio) | `185.199.108.153`       |
| A     | (vazio) | `185.199.109.153`       |
| A     | (vazio) | `185.199.110.153`       |
| A     | (vazio) | `185.199.111.153`       |
| AAAA  | (vazio) | `2606:50c0:8000::153`   |
| AAAA  | (vazio) | `2606:50c0:8001::153`   |
| AAAA  | (vazio) | `2606:50c0:8002::153`   |
| AAAA  | (vazio) | `2606:50c0:8003::153`   |
| CNAME | `www` | `seuusuario.github.io`    |

Esses são os endereços oficiais do GitHub Pages; confira se continuam os mesmos na [documentação do GitHub](https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) antes de configurar.

### No GitHub

1. Em **Settings → Pages → Custom domain**, digite `isaacbrasil.com.br` e clique em **Save** (o GitHub cria um arquivo `CNAME` no repositório).
2. Aguarde a verificação do DNS — pode levar de alguns minutos a 48 horas.
3. Marque **Enforce HTTPS** quando a opção ficar disponível.
4. Recomendado: em **Settings (da sua conta) → Pages**, verifique o domínio para evitar que terceiros o utilizem.
5. Atualize os endereços de `canonical`, `og:url` e `og:image` em `index.html` para o novo domínio.

---

## Acessibilidade e boas práticas já incluídas

- HTML semântico, link "Pular para o conteúdo" e navegação completa por teclado (incluindo o menu móvel, que fecha com `Esc`).
- Contraste de cores adequado para leitura e foco visível em links, botões e campos.
- Animações discretas, desativadas automaticamente para quem prefere reduzir movimento no sistema.
- Links externos abrem em nova aba, com aviso para leitores de tela.
- Título, descrição, Open Graph e dados estruturados (schema.org) para buscadores e redes sociais.
