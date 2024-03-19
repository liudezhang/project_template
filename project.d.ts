interface IProjectConfig {
  name: string;
  value: string;
  description: string;
}

type ProjectList = IProjectConfig[];

export { IProjectConfig, ProjectList };
