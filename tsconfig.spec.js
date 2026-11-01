{
  "extends": "tsconfig.build.json",
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "nodenext",
    "sourceMap": false,
    "removeComments": false,
    "declaration": false,
    "isolatedModules": false,
    "strict": false,
    "noImplicitAny": false,
    "noFallthroughCasesInSwitch": false,
    "forceConsistentCasingInFileNames": false,
    "strictBindCallApply": false
  },
  "include": ["**/*spec.ts"]
}