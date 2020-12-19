

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -yq
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -yq
WORKDIR /src
COPY ["StreetStream/StreetStream.csproj", "StreetStream/"]
RUN dotnet restore "StreetStream/StreetStream.csproj"
COPY . .
WORKDIR "/src/StreetStream"
RUN dotnet build "StreetStream.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StreetStream.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "StreetStream.dll"]