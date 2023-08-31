FROM mcr.microsoft.com/dotnet/sdk:7.0.400 AS build-env
WORKDIR /app

# Copiar arquivos .csproj e restaurar dependencias
COPY APIs.Security.JWT/APIs.Security.JWT.csproj ./APIs.Security.JWT/
COPY APIContagem/APIContagem.csproj ./APIContagem/
RUN dotnet restore APIContagem/APIContagem.csproj

# Build da aplicacao
COPY . ./
RUN dotnet publish APIContagem/APIContagem.csproj -c Release -o out

# Build da imagem
FROM mcr.microsoft.com/dotnet/aspnet:7.0.10
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "APIContagem.dll"]