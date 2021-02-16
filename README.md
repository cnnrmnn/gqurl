# gqurl

**gqurl** is a CLI that lets you send HTTP requests with GraphQL queries loaded from files.

## Usage
```
gqurl [--query <path>] [--variables <path>] [--headers <path>] <url>
```

## Acknowledgement
Hasura maintains a much more powerful GraphQL CLI called [graphqurl](https://github.com/hasura/graphqurl). The main reason that I built **gqurl** is that graphqurl doesn't allow you to load queries from files. **gqurl** provides this missing functionality. 
