# LoadTests-k6_DevOpsExperience-Ago2023
Conteúdos sobre testes de carga com k6 relativos à minha apresentação durante a edição de Agosto-2023 do DevOps Experience.

---

Exemplo de implementação de testes de carga (API REST protegida por JWT) em JavaScript para execução com a ferramenta k6, incluindo a geração de relatórios com os resultados através do projeto k6-reporter e exportação também para JMeter (arquivo .xml). Este repositório também inclui um Pipeline do Azure DevOps.

A API REST foi disponibilizada como uma **imagem pública** no **Docker Hub**:

```bash
docker pull renatogroffe/apicontagem-dotnet7-jwt-simulacaofalhas:1
```