# Conectar o Meu Fluxo ao Google Planilhas

## 1. Criar a planilha e o script

1. Crie uma planilha vazia no Google Planilhas.
2. Abra **Extensões → Apps Script**.
3. Apague o conteúdo inicial e cole todo o conteúdo de `Code.gs` desta pasta.
4. Salve o projeto com um nome como **Meu Fluxo - Banco de dados**.

## 2. Criar sua chave particular

1. No editor do Apps Script, abra **Configurações do projeto** (ícone de engrenagem).
2. Em **Propriedades do script**, adicione uma propriedade:
   - Propriedade: `SYNC_TOKEN`
   - Valor: crie uma frase longa e secreta, por exemplo `Fluxo-2026-minha-chave-privada-83`.
3. Salve. Não compartilhe essa chave.

## 3. Publicar o aplicativo

1. Clique em **Implantar → Nova implantação**.
2. Clique no ícone de engrenagem e selecione **Aplicativo da web**.
3. Em “Executar como”, escolha **Eu**.
4. Em “Quem tem acesso”, escolha **Qualquer pessoa**. A chave privada ainda é exigida para acessar os dados.
5. Clique em **Implantar**, autorize o Google quando solicitado e copie a URL terminada em `/exec`.

## 4. Conectar no site

1. Publique ou abra o site usando HTTPS (GitHub Pages é uma boa opção).
2. No canto superior direito, toque no ícone de engrenagem.
3. Cole a URL `/exec` e a mesma chave particular.
4. Toque em **Conectar e sincronizar**.

A partir daí, o mesmo endereço do site e a mesma configuração em cada aparelho mantêm as finanças na mesma planilha. A primeira conexão usa o que já existe na planilha; se ela estiver vazia, envia os dados que estão no navegador.

## Publicar sem servidor: GitHub Pages

Você não precisa de hospedagem paga. Crie um repositório no GitHub, envie a pasta `finance-dashboard` e, em **Settings → Pages**, selecione a branch `main` e a pasta raiz. O GitHub fornecerá um endereço HTTPS. Esse endereço também permite instalar o painel como aplicativo web no celular.

## Segurança e cuidado

Esta solução é adequada para uso pessoal. A chave fica salva no navegador de cada aparelho conectado; use uma chave longa, não compartilhe o link do site já configurado e revogue a implantação/crie uma nova chave se perder um dispositivo.
