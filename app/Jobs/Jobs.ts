import MatchingJob from './MatchingJob';


class Jobs {
  // private matchingJobInterval = 2000;
  private matchingJobInterval = 60000 * 60 * 6;

  public async execute() {
    setInterval(MatchingJob.execute, this.matchingJobInterval);
  }

}


export default new Jobs();
