import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit{
  title:string = ""
  questions:any
  questionSelected:any
  answers:string[] = []
  answerSelected:string = ""
  index = 0
  maxIndex = 0

  finished:boolean = true

  constructor(){}

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionSelected = quizz_questions.questions[this.index]
      this.maxIndex = this.questions.length
    }
  }

  playerChoose(value:string){
    this.answers.push(value);
    this.nextStep()
  }

  async nextStep(){
    this.index += 1
    if(this.maxIndex > this.index){
      this.questionSelected = this.questions[this.index]
    }
    else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
      this.finished = true
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((prev,curr,i,arr)=>{
      if(
        arr.filter(item => item === prev).length >
        arr.filter(item => item === curr).length
      ){
        return prev
      }
      else{
        return curr
      }
    })
    return result
  }
}
