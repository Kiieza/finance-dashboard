# Configuração automática da planilha

Abra `app.js` e altere somente esta linha, no começo do arquivo:

```js
const BUILT_IN_CONFIG={url:'',token:''};
```

Exemplo preenchido:

```js
const BUILT_IN_CONFIG={
  url:'https://script.google.com/macros/s/SEU_ID_AQUI/exec',
  token:'sua-chave-secreta-aqui'
};
```

Depois salve e publique a nova versão no GitHub. O site já conectará automaticamente, sem a necessidade de abrir a engrenagem em cada dispositivo.

## Atenção

Não faça isso em repositório público: qualquer pessoa pode abrir o JavaScript do site e copiar a chave. Para usar a configuração automática, deixe o repositório **privado** ou use o preenchimento manual da engrenagem, que é mais seguro para um site público.

## Corrigir o GitHub Pages deste projeto

Atualmente o repositório possui uma pasta `finance-dashboard` na raiz e o arquivo `index.html` está dentro dela. O GitHub Pages procura `index.html` diretamente na raiz do repositório, por isso o endereço retorna 404.

Mova **todo o conteúdo de dentro da pasta** `finance-dashboard` para a raiz do repositório. Ao final, a lista de arquivos no GitHub deve começar assim:

```
index.html
app.js
styles.css
manifest.webmanifest
service-worker.js
assets/
google-apps-script/
```

Em seguida, em **Settings → Pages**, escolha **Deploy from a branch**, branch `main` e pasta `/(root)`. Salve e aguarde alguns minutos. O endereço `https://kiieza.github.io/finance-dashboard/` passará a abrir.
