import type { ContentObject } from '../model/Content';
import { Content } from '../model/Content';

export interface RepoContentsObject {
  solution: ContentObject | null;
  design: ContentObject | null;
  development: ContentObject | null;
  delivery: ContentObject | null;
  problem: ContentObject | null;
  details: ContentObject | null;
  story: ContentObject | null;
}

export class RepoContents {
  solution: Content | null;
  design: Content | null;
  development: Content | null;
  delivery: Content | null;
  problem: Content | null;
  details: Content | null;
  story: Content | null;

  constructor(data?: Partial<RepoContentsObject>) {
    this.solution = data?.solution ? new Content(data.solution) : null;
    this.design = data?.design ? new Content(data.design) : null;
    this.development = data?.development
      ? new Content(data.development)
      : null;
    this.delivery = data?.delivery ? new Content(data.delivery) : null;
    this.problem = data?.problem ? new Content(data.problem) : null;
    this.details = data?.details ? new Content(data.details) : null;
    this.story = data?.story ? new Content(data.story) : null;
  }

  setSolution(solution: Content) {
    this.solution = solution;
  }

  setDesign(design: Content) {
    this.design = design;
  }

  setDevelopment(development: Content) {
    this.development = development;
  }

  setDelivery(delivery: Content) {
    this.delivery = delivery;
  }

  setProblem(problem: Content) {
    this.problem = problem;
  }

  setDetails(details: Content) {
    this.details = details;
  }

  setStory(story: Content) {
    this.story = story;
  }

  toRepoContentsObject(): RepoContentsObject {
    return {
      solution: this.solution ? this.solution.toContentObject() : null,
      design: this.design ? this.design.toContentObject() : null,
      development: this.development
        ? this.development.toContentObject()
        : null,
      delivery: this.delivery ? this.delivery.toContentObject() : null,
      problem: this.problem ? this.problem.toContentObject() : null,
      details: this.details ? this.details.toContentObject() : null,
      story: this.story ? this.story.toContentObject() : null,
    };
  }
}